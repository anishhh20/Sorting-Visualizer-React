import React from 'react';
import './Bar.css'

import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';

export default function Form({ formLabel, values, currentValue, lables, onChange, disabled1 }) {
	return (
		<div className='container-small card text-center' style={{backgroundColor: '#eee', padding: '.5em .5em', color: 'hsl(0, 0%, 20%)'
}}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<RadioGroup value={currentValue} onChange={onChange}> 
					{values.map((value, index) => (
						<FormControlLabel
							key={`${value}_${index}`}
							value={value}
							control={<Radio />}
                            label={lables[index]}
							disabled={disabled1}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
}