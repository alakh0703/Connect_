import React from 'react';
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './View.css';
import back from '../../../../../Images/back.png';
import print from '../../../../../Images/print.png';
import delete0 from '../../../../../Images/delete0.svg';
import axios from 'axios';

function View(props) {
  const handleBack = () => {
    props.setViewMail(false);
  };

  const [deleteTime, setDeleteTime] = React.useState(5);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState('')

  const checkDevice = () => {
    if(window.innerWidth <= 600){
      setIsMobile(true)
    }else{

      setIsMobile(false)
    }
  }
  async function deleteHandler() {
    console.log("DELETE HANDLER");
    const data = {
      "unique_id": props.id,
      "token": localStorage.getItem('jwtToken')
    };
    const response = await axios.post('https://connect-backend-c83a.onrender.com/connect/email/deleteMail', data);
    const responseData = await response;
    console.log(responseData);
    if (responseData.status === 200) {
      alert("Mail Deleted");
      props.setViewMail(false);
    }
  }

const e_mail = '<' + props.email + '>'

  // Create an EditorState with the provided JSON content
// Parse the JSON body into ContentState
const contentState = convertFromRaw(JSON.parse(props.body));
const editorState = EditorState.createWithContent(contentState);

React.useEffect(() => {
  console.log(props)
  checkDevice()
    console.log("BODY: " + props.body)
}, [])

  return (
    <div className={isMobile ? 'view_main_m':'view_main'}>
      <div className={isMobile ? 'view_nav_m':'view_nav'}>
        <img onClick={handleBack} src={back} alt='back' className={isMobile ? 'view_back_m':'view_back'} />
      </div>
      <div className='view_subject'>
        <p className='view_subject_name'>{props.subject}</p>
        <div className={isMobile ? 'view_subject_right_m':'view_subject_right'}>
          <img src={delete0} onClick={deleteHandler} alt='delete' className='view_deleyyyte view_print' />
          <img src={print} alt='print' className='view_print' />
        </div>
      </div>
      <div className='view_sender'>
        <div className={isMobile ? 'view_sender_profile_m':'view_sender_profile'}>
          <p className='nameAt0'>{(props.name).charAt(0)}</p>
        </div>
        <p className={isMobile ? 'view_sender_name_m':'view_sender_name'}>{props.name}</p>
        <p className='view_sender_email'>{e_mail}</p>
      </div>
      <div className='view_body'>
        {/* Render the parsed content using the Editor */}
        <Editor editorState={editorState} readOnly={true} />
      </div>
      {/* <div className='view_footer'>
        <button className='view_footer_btn'>Reply</button>
      </div> */}
    </div>
  );
}

export default View;







// import React from 'react';
// import './View.css';
// import back from '../../../../../Images/back.png';
// import print from '../../../../../Images/print.png';
// import delete0 from '../../../../../Images/delete0.svg';
// import axios from 'axios';
// function View(props) {
//     console.log("PROPS: " + props)
//     const handleBack = () => {
//         props.setViewMail(false);
//     }
//     const [deleteTime, setDeleteTime] = React.useState(5);
//     const [deleteConfirm, setDeleteConfirm] = React.useState(false);

 
   

//     async function deleteHandler(){

        
//         console.log("DELETE HANDLER")
//         const data = {
//             "unique_id": props.id,
//             "token": localStorage.getItem('jwtToken')
//         }
//         // console.log(data)
//         ////////////
//         const response = await axios.post('https://connect-backend-c83a.onrender.com/connect/email/deleteMail', data)
//         const responseData = await response;
//         console.log(responseData)
//         if (responseData.status === 200){
//             alert("Mail Deleted")
//             props.setViewMail(false);
//         }
      
//         // const response = await axios.post('https://connect-backend-c83a.onrender.com/connect/email/deleteMail', data)
//         // const responseData = await response;
//         // console.log(responseData)
//         // if (responseData.status === 200){
//         //     alert("Mail Deleted")
//         //     props.setViewMail(false);
//         // }
      

//     }
//   return (
//     <div className='view_main'>
//         <div className='view_nav'>
//             <img onClick={handleBack} src={back} alt='back' className='view_back'/>
//         </div>
//         <div className='view_subject'>
//             <p className='view_subject_name'>{props.subject}</p>
//             <div className='view_subject_right'>
//                 <img src={delete0} onClick={deleteHandler} alt='delete' className='view_delete view_print'/>
//                 <img src={print} alt='print' className='view_print'/>
//             </div>
//         </div>
//         <div className='view_sender'>
//             <div className='view_sender_profile'>
//                 <p>A</p>
//             </div>
//             <p className='view_sender_name'>{props.name}</p>
//             <p className='view_sender_email'>-{props.email}</p>
//         </div>
//         <div className='view_body'>
//             <p className='view_body_text'>{props.body}</p>
//         </div>
//       <div className='view_footer'>
//         <button className='view_footer_btn'>Reply</button>
        
//         </div>

      
//     </div>
//   )
// }

// export default View




