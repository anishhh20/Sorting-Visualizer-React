import { useEffect, useState } from 'react';
import './Bar.css';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


function Bar({ index, length, color, changeArray, isDisabled }) {

	const [len, setLen] = useState(length);

    useEffect(() => {
        setLen(length);
    }, [length]);

	const colors = ['hsl(0, 0%, 95%)', 'rgb(110, 199, 234)', 'lightgreen', '#ff304f'];

	const barStyle = {
        height: length,
        backgroundColor: `${colors[color]}`,
		transition: 'all 0.7s ease',
    }

    const inputStyle = {
        position: 'relative',
        top: '7px',
        width: '27px',
        border: 'none',
        background: 'none',
        padding: '0',
        transform: 'rotate(-90deg)'
    }

    const span_styles = {
        position: 'relative',
        top: length - 10 ,
    }

    const quantity = {
        position: 'relative',
        top: '80px',
        width: '25px',
        margin: 'auto',
    }

	const handleChange = (e) => {
		let val = e.target.value;
		if (val === '') {
			setLen(0);
			changeArray(index, 0);
		} else {
			val = parseInt(val);
			if (val > 200) {
				setLen(200);
				changeArray(index, 200);
			} else {
				setLen(val);
				changeArray(index, val);
			}
		}
	};

    const increment = () => {
        if(len >= 200)
            return
        else{
            setLen(len + 1);
            changeArray(index, len+1);
        }
    }

    const decrement = (e) => {
        if(len <= 50)
            return
        else{
            setLen(len - 1);
            changeArray(index, len-1);
        }
    }

	return (
		<>
        <div className="whole-div">
            <div className="bar" style={barStyle} >
                <div>
                    <input
                        type='number'
                        length={len}
                        style={inputStyle}
                        value={length}
                        className='input text-center'
                        onChange={handleChange}
                        disabled={isDisabled}
                    />
                </div>

                <div className='text-center'>

                    <span style={span_styles} className=' span_styles'></span>
                </div>
            </div>

            <div className="quantity-nav">
                <button className={`quantity-button text-success  ${isDisabled ? "random-disabled" : ""}`} style={quantity} onClick={increment} title='increment array ele' disabled={isDisabled} >
                    <AddCircleIcon />
                </button>
                <button className={`quantity-button text-danger  ${isDisabled ? "random-disabled" : ""}`} style={quantity} onClick={decrement} title='decrement array ele' disabled={isDisabled}>
                    <RemoveCircleIcon />
                </button>
            </div>
        </div>
    </>
	);
}

export default Bar;
