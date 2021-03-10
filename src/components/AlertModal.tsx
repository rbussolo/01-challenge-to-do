import { useEffect, useState } from 'react'
import '../styles/alertmodal.scss'

type AlertModalProps = {
    alert: {
        title: string;
        description: string;
        show: boolean;
    }
}

export function AlertModal(props: AlertModalProps) {
  const [show, setShow] = useState(false);

  useEffect(function(){
    setShow(props.alert.show);
  }, [props.alert.show, show]);

  function handleCloseModal(){
    setShow(false);
  }

  return (
    <div className={"modal-bg" + (show ? " modal-show" : "")}>
        <div className="modal-content">
            <span className="modal-close" onClick={handleCloseModal}>&times;</span>
            <h1>{props.alert.title}</h1>
            <p>{props.alert.description}</p>
        </div>
    </div>
  )
}