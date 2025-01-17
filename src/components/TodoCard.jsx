import { Button, Card, Modal } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";


export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : 'danger';
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setTodos = useContext(TodoContext).setTodos;


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000)
            setTimerInterval(intervalID)
        }
    }

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null)
    }

    const resetTimer = () => {
        clearInterval(timerInterval)
        setTimerInterval(null)
        setTimer(0)
    }

    const deleteTodo = () => {
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id))
        handleClose();
    }

    useEffect(() => {
        return () => {
            clearInterval(timerInterval)
        }
    }, [timerInterval])


    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <p>Timer: {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className='mx-2'>
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className='mx-2'>
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`todo/${todo.id}`} className='mx-2'>
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant='danger' onClick={handleShow} className='mx-2'>
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>

            < Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteTodo}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}