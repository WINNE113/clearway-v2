import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const WebSocketVideo = ({ routeId }) => {
  const [frame, setFrame] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(`ws://localhost:8001/ws/${routeId}`);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = (event) => {
      setFrame(event.data);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [routeId]);

  return (
    <div>
      {frame && <img src={`data:image/jpeg;base64,${frame}`} alt="Video Frame" />}
    </div>
  );
};

WebSocketVideo.propTypes = {
  routeId: PropTypes.string.isRequired
};

export default WebSocketVideo;