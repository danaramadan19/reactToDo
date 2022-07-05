import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from "react"
import Typography from '@mui/material/Typography';
import ToDoRow from "./ToDoRow"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div hidden={value !== index} {...other}  >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ToDos = () => {

    const [toDos, setToDos] = React.useState([])
    const [newToDo, setNewToDo] = React.useState("")
    React.useEffect(() => {

        const myToDos = localStorage.getItem("myTodos")
        const parsedToDos = JSON.parse(myToDos)
        setToDos(parsedToDos ?? [])  //؟؟ هاي تعني اذا كانت الليست فاضية حط ارري فاضية لا تخليه null
    }, [])


    const handleItemCheckboxClick = (id, newValue) => {
        const changedItem = toDos.find(item => item.id === id)

        const modifiedToDos = toDos.map((toDo) => {
            if (toDo.id !== id) return toDo;

            return {
                ...changedItem,
                isDone: newValue
            }
        })

        setToDos(modifiedToDos)
        localStorage.setItem("myTodos", JSON.stringify(modifiedToDos))
    }

    const [value, setValue] = React.useState(0);

    const done = toDos.filter(todo => todo.isDone)
    const notDone = toDos.filter(todo => !todo.isDone)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNewToDoChange = (e) => {
        setNewToDo(e.target.value)
    }


const handleAddToDo =()=>{
    const newToDoItem ={
        id: new Date().getTime(),
        title: newToDo,
        createdAt: new Date(),
        isDone: false
    }

    const newToDos = [...toDos, newToDoItem]
    setToDos(newToDos)
        localStorage.setItem("myTodos", JSON.stringify(newToDos))
        setNewToDo("")
}






    return (<div>
        <h2 >Welcome to the best <span className='welcom'>To Do List</span> website EVER!</h2>

<center><h6 className='welcome'>and yes we are even better than NOTION</h6></center>

<div>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="To Do" />
                    <Tab label="Done" />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>

            <TextField value={newToDo} onChange={handleNewToDoChange} id="outlined-basic" variant="outlined" />
                <Button onClick={handleAddToDo} color="secondary">Add a new ToDo!</Button>



                <div style={{
                    maxHeight: '400px',
                    overflowY: 'scroll',
                }} >

                    {notDone.map(toDo =>
                        <ToDoRow {...toDo} handleItemCheckboxClick={handleItemCheckboxClick} />)}

                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{
                    maxHeight: '500px',
                    overflowY: 'scroll',
              
                }} >
                    {
                        done.map(toDo => <ToDoRow {...toDo} handleItemCheckboxClick={handleItemCheckboxClick} />
                        )
                    }

                </div>
            </TabPanel>

        </Box>
        </div>
    </div>)
}


export default ToDos;


