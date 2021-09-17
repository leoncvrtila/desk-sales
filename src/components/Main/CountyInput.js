import React from 'react'
import '../../assets/css/input.scss'

const countyInput = (props) => {

	let inputElement = null;

		if(props.elementType === 'select'){

			inputElement = <div>
				<h4>Županija u kojoj živi</h4>
				<select 
				className="InputElement" 
				value={props.value}
				onChange={props.changedCounty}> 
					{props.elementConfig.options.map(opt => (
						<option key={opt.value} value={opt.displayValue}>
							{opt.displayValue}
						</option>
					))}
				</select>
				<div className="cautionError" style={{display: (props.value === '') && (props.errorModal === true) ? 'block' : 'none', marginLeft: 'auto', marginRight: 'auto', width: '40%'}}>⚠ Molim te odaberi županiju</div>
			</div>

		}
	

	return(
		
		inputElement

	
	);
};

export default countyInput;