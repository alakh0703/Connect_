import React, {useState} from 'react'
import './TaskManager.css';
// Icon from Flaticon.com
import tickIcon from '../../../Images/accept.png'
import crossIcon from '../../../Images/delete-button.png'
import restoreIcon from '../../../Images/history.png'
import axios from 'axios';


const TaskManager = (props) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
  const [loader, setLoader] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const getToken = () => {
      const tokenString = localStorage.getItem('jwtToken');
      const userToken = JSON.parse(tokenString);
      // alert(userToken)
      return userToken;
    }
    
    const retriveTasks = async () => {
      setLoader(true)
      const token = getToken()
      await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/getTasks', {token}).then((res) => {
        const data = res.data;
        console.log(data)
        const updatedTasks = []
        const updatedCompletedTasks = []
        for(let i=0; i<data[0].length; i++){
          updatedTasks.push(data[0][i].description)

        }
        for(let i=0; i<data[1].length; i++){
          updatedCompletedTasks.push(data[1][i].description)

        }
        console.log(updatedTasks)
        console.log(updatedCompletedTasks)
        setTasks(updatedTasks)
        setCompletedTasks(updatedCompletedTasks)
        setLoader(false)
      }
      ).catch((err) => {
        setLoader(false)
        alert(err)
      })
      setLoader(false)
    }

    const [isMobile, setIsMobile] = React.useState('')

   
    React.useEffect( () => {
      if(window.innerWidth <= 600){
        setIsMobile(true)
      }else{
        setIsMobile(false)
      }
      retriveTasks()
    }, []);


    const addTask = async () => {
      if (newTask.trim() !== '') {
        const oldTasks = [...tasks];
        // alert(newTask)
        setTasks([...tasks, newTask]);

        //
        setNewTask('');

        const token = getToken()


        await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/addTask', {token,newTask}).then((res) => {

//         const data = res.data;
//         // alert(data.length)
// console.log(data)
//         const updatedTasks = []
//         for(let i=0; i<data[0].length; i++){
//           updatedTasks.push(data[0][i].description)

//         }
//         console.log("data", data)
//         setTasks(updatedTasks)
        }
        ).catch((err) => {
          setTasks(oldTasks)
          alert(err)
        })


        // setTasks([...tasks, newTask]);
      }
    };
  
    const restoreTask = async (index) => {
    


      const updatedTasks = completedTasks.filter((_, i) => i !== index);
      const oldCompletedTasks = [...completedTasks];
      const oldTasks = [...tasks];
      const token = getToken()
  

      setTasks([...tasks, completedTasks[index]])
      setCompletedTasks(updatedTasks);

      const pendingTasks = [...tasks, completedTasks[index]]
      await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/restoreTask', {token,updatedTasks, pendingTasks}).then((res) => {

    }

      ).catch((err) => {  
        setCompletedTasks(oldCompletedTasks)
        setTasks(oldTasks)
        alert(err)
      })
    
    };


    
    const deleteTask = async (index) => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      const oldTasks = [...tasks];

      const token = getToken()
      setTasks(updatedTasks);
      await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/deleteTask', {token,updatedTasks}).then((res) => {

      // const data = res.data;
      // console.log(data)
      // const updatedTasks = []
      // for(let i=0; i<data[0].length; i++){
      //   updatedTasks.push(data[0][i].description)

      // }
      // console.log("data", data)
      // // alert("Task Deleted")
      // setTasks(updatedTasks)
  
      }
      ).catch((err) => {
        setTasks(oldTasks)
        alert(err)
      })


    };


    const deleteTask2 = async (index) => {
        const updatedTasks = completedTasks.filter((_, i) => i !== index);
        setCompletedTasks(updatedTasks);

        const oldTasks = [...tasks];
      
        const token = getToken()
  
        await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/deleteTask2', {token,updatedTasks}).then((res) => {
  
        // const data = res.data;
        // console.log(data)
        // const updatedTasks = []
        // for(let i=0; i<data[1].length; i++){
        //   updatedTasks.push(data[0][i].description)

        // }

        // setCompletedTasks(updatedTasks)
    
        }
        ).catch((err) => {
          setTasks(oldTasks)
          alert(err)
        })
  
      };

    const completeTaskHandler = async (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);

        setCompletedTasks([...completedTasks, tasks[index]])
        setTasks(updatedTasks);

        const oldTasks = [...tasks];
        const oldCompletedTasks = [...completedTasks];
        const uctasks = [...completedTasks, tasks[index]]
        const token = getToken()


       await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/completeTask', {token,updatedTasks, uctasks}).then((res) => {
        
        //  alert("Task Completed")

        // const data = res.data;
        // console.log(data)
        // const updatedTasks = []
        // const updatedCompletedTasks = []
        // for(let i=0; i<data[0].length; i++){
        //   updatedTasks.push(data[0][i].description)
        
        // }
        // for(let i=0; i<data[1].length; i++){
        //   updatedCompletedTasks.push(data[1][i].description)
        
        // }

        // setTasks(updatedTasks)
        // setCompletedTasks(updatedCompletedTasks)



    }
        ).catch((err) => {
          setTasks(oldTasks)
          setCompletedTasks(oldCompletedTasks)
          alert(err)
        }
        )


    }
    const restoreTaskHandler = async (index) => {
        const updatedTasks = completedTasks.filter((_, i) => i !== index);


        setCompletedTasks(updatedTasks);
        setTasks([...tasks, completedTasks[index]])


        const oldTasks = [...tasks];
        const oldCompletedTasks = [...completedTasks];

        const token = getToken()

        const pendingTasks = [...tasks, completedTasks[index]]
        await axios.post('https://connect-backend-c83a.onrender.com/connect/tasks/restoreTask', {token,updatedTasks, pendingTasks}).then((res) => {
        //   const data = res.data;
        // // alert("Task Restored")
        //   const updatedTasks = []
        //   const updatedCompletedTasks = []
        //   for(let i=0; i<data[0].length; i++){
        //     updatedTasks.push(data[0][i].description)
          
        //   }
        //   for(let i=0; i<data[1].length; i++){
        //     updatedCompletedTasks.push(data[1][i].description)
          
        //   }
        //   console.log(updatedTasks)
        //   console.log(updatedCompletedTasks)
        //   setTasks(updatedTasks)
        //   setCompletedTasks(updatedCompletedTasks)
    }
      
          ).catch((err) => {
            setTasks(oldTasks)
            setCompletedTasks(oldCompletedTasks)
            alert(err)
          }
          )


    }


    const taskChangeHandler1 = (e) => {
        setShowCompleted(false)
    }
    const taskChangeHandler2 = (e) => {
        setShowCompleted(true)
    }
  
    return (



      <div className={isMobile ? "task-manager_m": "task-manager"}>
<div className="task-header">
<h2>Task Manager</h2>
        <p onClick={props.setShowTask}>X</p>
</div>
<div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask} className='btn_addTask'>Add Task</button>
        </div>
    <div className='tasks-cat'>
        <div className='tasks-cat1' onClick={taskChangeHandler1}>
            <p className={!showCompleted && 'active'}>Pending</p>
    </div>
            <div className='tasks-cat2' onClick={taskChangeHandler2}>
            <p className={showCompleted && 'active'}>Completed</p>
            </div>
    </div>
    <div className='tasks-main'>
      {loader ? <div className='load'></div> :
      
      <div>

    
  {showCompleted ? <ul className="task-list">
        {completedTasks.length === 0 && <p>No completed tasks</p>}
          {completedTasks.map((task, index) => (

            <li key={index} className='li_task'>
              <p className='li_1'>
              {task}
              </p>
              <div className='task-btns'>

{/* <button onClick={()=> restoreTaskHandler(index)}>
  <img src={tickIcon} alt='tick' className='tickIcon'/>
</button> */}
<img src={restoreIcon} alt='tick' className='tickIcon' onClick={()=> restoreTaskHandler(index)} />


 <img src={crossIcon} alt='cross' className='crossIcon' onClick={() => deleteTask2(index)}/>

</div>
            </li>
          ))}
        </ul> : 
          <ul className="task-list">
            {tasks.length === 0 && <p>No pending tasks</p>}
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <div className='task-btns'>
              <img src={tickIcon} alt='tick' className='tickIcon' onClick={()=> completeTaskHandler(index)} />

                   {/* <button onClick={()=> completeTaskHandler(index)}>com</button> */}
                   <img src={crossIcon} alt='tick' className='tickIcon' onClick={() => deleteTask(index)}/>

                    {/* <button onClick={() => deleteTask(index)}>Delete</button> */}
                </div>
            </li>
          ))}
        </ul>

        } 
                 </div>
}
    </div>
      
   

      </div>
    );
  };

export default TaskManager