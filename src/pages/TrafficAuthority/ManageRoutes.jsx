import { useState, useEffect } from 'react'
import { Table, Button, Modal, Label, TextInput, Select } from 'flowbite-react'
import GoogleMapReact from 'google-map-react'
import Marker from '../../components/Marker'
import { getRoads, createRoad, createRouter, updateRoad, deleteRoad, updateRouter, deleteRouter } from '../../service/RouterAPI'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ManageRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [trafficRoads, setTrafficRoads] = useState([])
  const [selectedRoad, setSelectedRoad] = useState(null)
  const [showRouteModal, setShowRouteModal] = useState(false)
  const [showRoadModal, setShowRoadModal] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 15.983279, lng: 108.255955 })
  const [mapZoom, setMapZoom] = useState(14)
  const [isEditRoad, setIsEditRoad] = useState(false);
  const [isEditRouter, setIsEditRouter] = useState(false);
  const [selectedUid, setSelectedUid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [isDeleteRoute, setIsDeleteRoute] = useState(null)
  const [isDeleteRoad, setIsDeleteRoad] = useState(null)


  const [message, setMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [roadData, setRoadData] = useState({
    id: '',
    name_road: '',
    list_route: [],
  })
  const [routeData, setRouteData] = useState({
    route_name: '',
    start_location: ['', ''],
    end_location: ['', ''],
    traffic_status: 'Bình Thường',
    connect_camera: false,
    min_speed_route: 0,
    max_speed_route: 0,
    type_route: 'Đường Chính',
  })


  const handleChangeDataRoad = (e) => {
    const { name, value } = e.target
    setRoadData(prev => ({ ...prev, [name]: value }))
  }

  const handleChangeDataRouter = (e) => {
    const { name, value } = e.target
    setRouteData(prev => ({ ...prev, [name]: value }))
  }



  const handleConfirmUpdateRoad = async () => {
    try {
      var formDta = {
        name_road: roadData.name_road
      }
      console.log("Road: " + JSON.stringify(roadData))
      const res = await updateRoad(formDta, roadData?._id);
      setShowRoadModal(false);
      fetchTrafficRoads();
    } catch (error) {
      setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
      setShowMessageModal(true);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirmUpdateRouter = async () => {
    try {
      var formDta = {
        route_name: routeData.route_name,
        start_location: routeData.start_location,
        end_location: routeData.end_location,
        traffic_status: routeData.traffic_status,
        connect_camera: routeData.connect_camera,
        min_speed_route: routeData.min_speed_route,
        max_speed_route: routeData.max_speed_route,
        type_route: routeData.type_route,
      }
      const res = await updateRouter(formDta, routeData?._id);

      // Cập nhật thông tin trong selectedRoad
      setSelectedRoad((prevSelectedRoad) => ({
        ...prevSelectedRoad,
        routes: prevSelectedRoad.routes.map((route) =>
          route._id === routeData._id ? { ...route, ...formDta } : route
        ),
      }));

      setShowRouteModal(false);
    } catch (error) {
      setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
      setShowMessageModal(true);
    } finally {
      setLoading(false);
    }
  }

  const handleLocationChange = (locationType, index, value) => {
    setRouteData((prevData) => ({
      ...prevData,
      [locationType]: [
        ...prevData[locationType].slice(0, index),
        value,
        ...prevData[locationType].slice(index + 1),
      ],
    }));
  };


  const handleUpdateRoad = async (road) => {
    setIsEditRoad(true);
    setShowRoadModal(true);
    setRoadData(road);
  };

  const handleUpdateRouter = async (router) => {
    setIsEditRouter(true);
    setShowRouteModal(true);
    setRouteData(router);
  };


  const handleShowModelAddRoad = () => {
    setIsEditRoad(false)
    setShowRoadModal(true)
  }

  const handleShowModelAddRoute = () => {
    setIsEditRouter(false)
    setShowRouteModal(true)
  }

  const handleDelete = (uid, type) => {
    if (type === "router") {
      setIsDeleteRoute(true)
      setIsDeleteRoad(false)
    } else {
      setIsDeleteRoad(true)
      setIsDeleteRoute(false)
    }
    setSelectedUid(uid);
    setIsModalOpen(true);
  }

  const handleDeleteRoad = async () => {
    try {
      const response = await deleteRoad(selectedUid);
      setIsModalOpen(false);
      fetchTrafficRoads();
    } catch (error) {
      setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
      setShowMessageModal(true);
    }
  };

  const handleDeleteRouter = async () => {
    try {
      const response = await deleteRouter(selectedUid);


      // Cập nhật danh sách routes trong selectedRoad
      setSelectedRoad((prevSelectedRoad) => ({
        ...prevSelectedRoad,
        routes: prevSelectedRoad.routes.filter((route) => route._id !== selectedUid),
      }));

      fetchTrafficRoads();
      setIsModalOpen(false);
    } catch (error) {
      setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
      setShowMessageModal(true);
    }
  };

  useEffect(() => {
    if (selectedRoad && selectedRoad.routes.length > 0) {
      const lats = selectedRoad.routes.flatMap(route => [parseFloat(route.start_location[0]), parseFloat(route.end_location[0])])
      const lngs = selectedRoad.routes.flatMap(route => [parseFloat(route.start_location[1]), parseFloat(route.end_location[1])])
      const minLat = Math.min(...lats)
      const maxLat = Math.max(...lats)
      const minLng = Math.min(...lngs)
      const maxLng = Math.max(...lngs)
      setMapCenter({
        lat: (minLat + maxLat) / 2,
        lng: (minLng + maxLng) / 2
      })
      setMapZoom(13) // Adjust this value to fit all markers
    }
  }, [selectedRoad])

  const fetchTrafficRoads = async () => {
    try {
      const response = await getRoads();
      if (response && response.data) {
        setTrafficRoads(response.data)
      } else {
        setTrafficRoads([])
      }
    } catch (error) {
      console.error('Error fetching traffic roads:', error)
    }
  }

  const handleAddRoute = async (e) => {
    try {
      e.preventDefault();
      const response = await createRouter(routeData);
      setShowRouteModal(false)
      fetchTrafficRoads()
    } catch (error) {
      console.error('Error adding route:', error)
    }
  }

  const handleAddRoad = async (e) => {
    try {
      e.preventDefault();
      const response = await createRoad(roadData)
      setShowRoadModal(false)
      fetchTrafficRoads()

    } catch (error) {
      console.error('Error adding road:', error)
    }
  }

  useEffect(() => {
    fetchTrafficRoads()
  }, [])

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white p-3">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl mb-1 font-bold">Danh sách các tuyến đường</h2>
              </div>
              <div className="flex items-center">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={() => handleShowModelAddRoute()}>
                  <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add Route
                  </span>
                </button>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={() => handleShowModelAddRoad()}>
                  <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add Road
                  </span>
                </button>
              </div>
            </div>
            <Table>
              <Table.Head>
                <Table.HeadCell>Tên đường chính</Table.HeadCell>
                <Table.HeadCell>Số đường phụ</Table.HeadCell>
                <Table.HeadCell>Ngày tạo</Table.HeadCell>
                <Table.HeadCell>Xem chi tiết</Table.HeadCell>
                <Table.HeadCell>Hành động</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {trafficRoads?.map((road) => (
                  <Table.Row key={road._id}>
                    <Table.Cell>{road.name_road}</Table.Cell>
                    <Table.Cell>{road.routes.length}</Table.Cell>
                    <Table.Cell>{road.created_at}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => setSelectedRoad(road)}>Chi tiết</Button>
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => handleUpdateRoad(road)} className="w-6 h-6 text-black"><FaRegEdit /></button>
                      <button onClick={() => handleDelete(road._id, "road")} className="w-6 h-6 text-red-600"><MdDelete />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {selectedRoad && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Thông tin:  {selectedRoad.name_road}</h2>
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Tên đường</Table.HeadCell>
                    <Table.HeadCell>Ngày tạo</Table.HeadCell>
                    <Table.HeadCell>Kết nối camera</Table.HeadCell>
                    <Table.HeadCell>Tình trạng tuyến đường</Table.HeadCell>
                    <Table.HeadCell>Tốc độ cho phép</Table.HeadCell>
                    <Table.HeadCell>Thể loại</Table.HeadCell>
                    <Table.HeadCell>Hành động</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {selectedRoad?.routes?.map((route) => (
                      <Table.Row key={route._id}>
                        <Table.Cell>{route.route_name}</Table.Cell>
                        <Table.Cell>{route.created_at}</Table.Cell>
                        <Table.Cell>{route.connect_camera === false ? "Không có kết nối" : "Có kết nối"}</Table.Cell>
                        <Table.Cell>{route.traffic_status}</Table.Cell>
                        <Table.Cell>{route.min_speed_route} - {route.max_speed_route} (km/h)</Table.Cell>
                        <Table.Cell>{route.type_route}</Table.Cell>
                        <Table.Cell>
                          <button onClick={() => handleUpdateRouter(route)} className="w-6 h-6 text-black"><FaRegEdit /></button>
                          <button onClick={() => handleDelete(route._id, "router")} className="w-6 h-6 text-red-600"><MdDelete />
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

              </div>
            )}

            <Modal show={showRouteModal} onClose={() => setShowRouteModal(false)}>
              <Modal.Header>Tạo tuyến đường nhỏ</Modal.Header>
              <Modal.Body>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="route_name">Tên đường</Label>
                    <TextInput
                      id="route_name"
                      name="route_name"
                      value={routeData.route_name}
                      onChange={handleChangeDataRouter}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_lat">Vĩ độ bắt đầu</Label>
                    <TextInput
                      id="start_lat"
                      name="start_location[0]"
                      value={routeData.start_location[0]}
                      onChange={(e) => handleLocationChange("start_location", 0, e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_lng">Kinh độ bắt đầu</Label>
                    <TextInput
                      id="start_lng"
                      name="start_location[1]"
                      value={routeData.start_location[1]}
                      onChange={(e) => handleLocationChange("start_location", 1, e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_lat">Vĩ độ kết thúc</Label>
                    <TextInput
                      id="end_lat"
                      name="end_location[0]"
                      value={routeData.end_location[0]}
                      onChange={(e) => handleLocationChange("end_location", 0, e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_lng">Kinh độ kết thúc</Label>
                    <TextInput
                      id="end_lng"
                      name="end_location[1]"
                      value={routeData.end_location[1]}
                      onChange={(e) => handleLocationChange("end_location", 1, e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="min_speed_route">Tốc độ tối thiểu</Label>
                    <TextInput
                      id="min_speed_route"
                      name="min_speed_route"
                      type='number'
                      value={routeData.min_speed_route}
                      onChange={handleChangeDataRouter}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="max_speed_route">Tốc độ tối đa</Label>
                    <TextInput
                      id="max_speed_route"
                      name="max_speed_route"
                      type='number'
                      value={routeData.max_speed_route}
                      onChange={handleChangeDataRouter}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="connect_camera">Kết nối camera</Label>
                    <Select
                      id="connect_camera"
                      name="connect_camera"
                      value={routeData.connect_camera}
                      onChange={handleChangeDataRouter}
                    >
                      <option value="false">Không kết nối</option>
                      <option value="true">Có kết nối</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="traffic_status">Trạng thái tuyến đường</Label>
                    <Select
                      id="traffic_status"
                      name="traffic_status"
                      value={routeData.traffic_status}
                      onChange={handleChangeDataRouter}
                    >
                      <option value="Bình Thường">Bình Thường</option>
                      <option value="Ùn Tắc">Ùn Tắc</option>
                      <option value="Tai Nạn">Tai Nạn</option>
                      <option value="Tắc đường nhẹ">Tắc đường nhẹ</option>
                      <option value="Tắc đường nặng">Tắc đường nặng</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type_route">Thể loại tuyến đường</Label>
                    <Select
                      id="type_route"
                      name="type_route"
                      value={routeData.type_route}
                      onChange={handleChangeDataRouter}
                    >
                      <option value="Đường Chính">Đường Chính</option>
                      <option value="Đường Phụ">Đường Phụ</option>
                    </Select>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex items-center justify-center w-full gap-16">
                  <Button className="bg-[#B80707] text-white w-32" onClick={() => setShowRouteModal(false)}> Hủy </Button>
                  <Button className='bg-[#4B49AC] text-white w-32' onClick={isEditRouter ? handleConfirmUpdateRouter : handleAddRoute}>{isEditRouter ? "Cập Nhật" : "Tạo"}</Button>
                </div>
              </Modal.Footer>
            </Modal>

            <Modal show={showRoadModal} onClose={() => setShowRoadModal(false)}>
              <Modal.Header>{isEditRoad ? "Cập nhật tuyến đường lớn" : "Tạo tuyến đường lớn"}</Modal.Header>
              <Modal.Body>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name_road">Road Name</Label>
                    <TextInput
                      id="name_road"
                      name="name_road"
                      value={roadData.name_road}
                      onChange={handleChangeDataRoad}
                      required
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <div className="flex items-center justify-center w-full gap-16">
                  <Button className="bg-[#B80707] text-white w-32" onClick={() => setShowRoadModal(false)}> Hủy </Button>
                  <Button className='bg-[#4B49AC] text-white w-32' onClick={isEditRoad ? handleConfirmUpdateRoad : handleAddRoad}> {isEditRoad ? "Cập nhật" : "Tạo"} </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="col-span-1">
          <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
              center={mapCenter}
              zoom={mapZoom}
            >
              {selectedRoad?.routes.map((route) => (
                <>
                  <Marker
                    key={`start-${route._id}`}
                    lat={parseFloat(route.start_location[0])}
                    lng={parseFloat(route.start_location[1])}
                    text="S"
                  />
                  <Marker
                    key={`end-${route._id}`}
                    lat={parseFloat(route.end_location[0])}
                    lng={parseFloat(route.end_location[1])}
                    text="E"
                  />
                </>
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
      <Modal show={showMessageModal} onClose={() => setShowMessageModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              {message}
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='gray' onClick={() => setShowMessageModal(false)}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header> Bạn có chắc chắn muốn xóa ? </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"> Hành động này không thể hoàn tác! </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={isDeleteRoad ? handleDeleteRoad : handleDeleteRouter}> Xóa </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}> Hủy </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default ManageRoutes

