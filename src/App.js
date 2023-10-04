import React, { Component } from 'react';

import audioFile from './algorithms/click.ogg'

import ReactModal from 'react-modal';
import Slider from '@mui/material/Slider';

import CreatableSelect from 'react-select/creatable';

// Algorithms
import BubbleSort from './algorithms/BS';

// Icons
import Play from '@mui/icons-material/PlayArrow';
import Forward from '@mui/icons-material/KeyboardDoubleArrowRight';
import Backward from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Replay from '@mui/icons-material/Replay';
import Pause from '@mui/icons-material/Pause';

import Bar from './components/Bar';
import Form from './components/Form';
//CSS
import './App.css';

class App extends Component {
	state = {
		array: [],
		arraySteps: [],
		colorKey: [],
		colorSteps: [],
		currentStep: 0,
		count: 10,
		delay: 500,
		algorithm: 'Bubble Sort',
		timeouts: [],
		selected: '',
		isDisabled: false,
		isInfo: false,
		showModal: false,
		sliderValue: 0,
		isPause: false,
		play: false
	};
	

	ALGORITHMS = {
		'Bubble Sort': BubbleSort,
	};

	// lifecycle method in React class components. It is called once the component has been rendered to the DOM (mounted).
	componentDidMount() {
		this.generateRandomArray();

		// Add a click event listener to the document
    	document.addEventListener('click', this.handleDocumentClick);
	}

	componentWillUnmount() {
		// Remove the click event listener when the component is unmounted
		document.removeEventListener('click', this.handleDocumentClick);
	}

	handleDocumentClick = () => {
		// Play the audio file when any element on the page is clicked
		const audio = new Audio(audioFile);
		audio.play();
	};

	//generate steps tht need to sorting
	generateSteps = () => {
		this.clearTimeouts();
		this.clearColorKey();

		let array = this.state.array.slice();
		let steps = this.state.arraySteps.slice();
		let colorSteps = this.state.colorSteps.slice();

		this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

		this.setState({
			arraySteps: steps,
			colorSteps: colorSteps,
		});
		
	};

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	generateRandomArray = () => {
		
		this.clearTimeouts();
		this.clearColorKey();
		const count = this.state.count;
		const temp = [];

		for (let i = 0; i < count; i++) {
			temp.push(this.generateRandomNumber(50, 200));
		}

		this.setState(
			{
				array: temp,
				arraySteps: [temp],
				sortSteps: [temp],
				currentStep: 0,
				isDisabled: false
			},
			() => {
				this.generateSteps();
			}
		);
	};

	clearTimeouts = () => {
		this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
		this.setState({
			timeouts: [],
		});
	};

	clearColorKey = () => {
		var data = [];

		for(var i = 0; i < this.state.count; i++) {
			data.push(0);
		}

		this.setState({
			colorKey: data,
			colorSteps: [data],
		});
	};

	changeArray = (index, value) => {
		var arr = this.state.array;
		if(value > 200){
			return;
		}
		// console.log(value);
		if(value < 50){
			return;
		}

		arr[index] = value;
		this.setState(
			{
				array: arr,
				arraySteps: [arr],
				currentStep: 0,
			},
			() => {
				this.generateSteps();
			}
		);
	};

	previousStep = () => {
		let currentStep = this.state.currentStep;
		if (currentStep === 0) return;
		if(!this.state.array){
			// console.log('s')
			this.generateRandomArray();
		}
		currentStep -= 1;
		this.setState({
			currentStep: currentStep,
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
		});
	};

	nextStep = () => {
		let currentStep = this.state.currentStep;
		if(!this.state.array){
			this.generateSteps();
		}
		if (currentStep >= this.state.arraySteps.length - 1) return ;
		currentStep += 1;
		this.setState({
			currentStep: currentStep,
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
		});
	};

	// pause = () => {
	// 	this.setState({
	// 		isPause: true,
	// 	})
	// }

	// play = () => {
	// 	this.setState({
	// 		isPause: false,
	// 	})
	// }

	start = () => {
		
		this.setState({
			isDisabled: true,
			play: true
		});
		
		let steps = this.state.arraySteps;
		let colorSteps = this.state.colorSteps;

		this.clearTimeouts();

		let timeouts = [];
		let i = 0;

		while (i < steps.length - this.state.currentStep) {
			
			
			let timeout = setTimeout(async() => {
				console.log(this.state.play);
				let currentStep = this.state.currentStep;

				// if (this.state.isPause === true) {
				// 	console.log('pause');
				// 	await new Promise((resolve) => setTimeout(resolve, 10000));
				// }

				this.setState({
					array: steps[currentStep],
					colorKey: colorSteps[currentStep],
					currentStep: currentStep + 1,
				});
				timeouts.push(timeout);
				
			}, this.state.delay * i);
			i++;
		}

		this.setState({
			timeouts: timeouts,
			arraySorted: true,
			isDisabled: true,
		});		
	};

	_onSelect = (option) => {
		if(option === null){
			return 
		}
		else(this.setState({
			selected: option.label,
		}))
	}

	setValue = (value) => {
		this.setState(
			{
				count: value,
			},
			() => {
				this.generateRandomArray();
			}
		);

	}

	handleChange = (option) => {
		if(option === null){
			return 
		}
		this.setValue(option.value)
	}

	handleInfo = () => {
		this.setState({ 
			isInfo: !this.state.isInfo,
		})
	}

	handleOpenModal = () => {
		this.setState({ showModal: true });
	}
	
	handleCloseModal = () => {
		this.setState({ showModal: false });
	}

	changeSpeed = (e) => {
		this.clearTimeouts();
		this.setState({
			delay: parseInt(e.target.value),
		})
	}

	// reset = () => {
	// 	this.setState({
	// 		isDisabled: false,
	// 	},
	// 		() => {
	// 			this.generateSteps();
	// 		}
	// 	);
	// }
	
	render() {

		const sortingOptions = [
			{ value: 'Bubble Sort', label: 'Bubble Sort' },
			{ value: 'Selection Sort', label: 'Selection Sort' },
			{ value: 'Insertion Sort', label: 'Insertion Sort' }
		]

		const barsOptions = [
			{ value: '5', label: '5'},
			{ value: '10', label: '10'},
			{ value: '15', label: '15'},
			{ value: '20', label: '20'},
		]


		//?  checks if array exist and maps only then
		let bars = this.state.array && this.state.array.map((value, index) => (
			<Bar
				key={index}
				index={index}
				length={value}
				color={this.state.colorKey[index]}
				changeArray={this.changeArray}
				isDisabled={this.state.isDisabled}
			/>
		));

		let playButton;


	 	if (this.state.arraySteps.length === this.state.currentStep) {
			playButton = (
				<button className='controller button' onClick={this.generateRandomArray} title='New Array' >
					<Replay />
				</button>
			);
		} else {

			// if(this.state.isPause){
			// 	playButton = (
			// 		<button className='controller button' onClick={this.play} title='Play' >
			// 			<Play />
			// 		</button>
			// 	);
			// }
			// else{
				playButton = (
					<button disabled={this.state.isDisabled} className='controller button' onClick={this.start} title='Visualize' >
						<Play />
					</button>
				);
			// }
			
		}

		// if (this.state.play){
		// 	playButton = (
		// 			<button className='controller button' onClick={this.pause} title='Pause' >
		// 				<Pause />
		// 			</button>
		// 		);
		// }

		return (
			
			<div className='App'>

				<div>
						<button onClick={this.handleOpenModal} className='trig_button  p-2 button'>info !</button>
							<ReactModal className="dialog_box"
								isOpen={this.state.showModal}
									shouldCloseOnEsc={false}
							>
							<div className="info">
								<button onClick={this.handleCloseModal}  className='trig_button p-2 trig_close button'>Close</button>
								<ol className='text'>

									<li>Compare a pair of adjacent items (a, b),</li>
									<li>
										Swap that pair if the items are out of order (in this case, when a
										{' >'} b),
									</li>
									<li>
										Repeat Step 1 and 2 until we reach the end of array (the last pair
										is the (N-2)-th and (N-1)-th items as we use 0-based indexing),
									</li>
									<li>
										By now, the largest item will be at the last position. We then
										reduce N by 1 and repeat Step 1 until we have N = 1.
									</li>
									<br></br>
									<p className=''>
										Time Complexity: O(n<sup>2</sup>)
									</p>
								</ol>
							</div>
						</ReactModal>
					</div>

				<div className="header text-center">
					Sorting Visualizer
					<p className="sub-header">{this.state.algorithm}</p>
				</div>

				{/* <button onClick={this.reset}>Reset</button> */}

				<div className='frame d-flex justify-content-center align-items-center'>
					<div className='barsDiv container card d-flex justify-content-center align-items-end flex-row'>{bars}</div>
				</div>
				<div className='control-pannel d-flex justify-content-center align-items-center'>

					<button disabled={this.state.isDisabled} className={this.state.isDisabled ? 'random random-disabled button' : 'random button'} onClick={this.generateRandomArray} title="Generate random array">
						New Array
					</button>

					<div>
						<CreatableSelect isDisabled={this.state.isDisabled} defaultValue={sortingOptions[0]} isClearable options={sortingOptions} onChange={this._onSelect} className={this.state.isDisabled ? 'dropdown random-disabled' : 'dropdown'} placeholder='Currently in process..'  />
					</div>	

					{/* <div className='slider text-center'>
						<Slider defaultValue={3} aria-label="Default" valueLabelDisplay="auto" min={1} max={4} step={1} marks getAriaValueText={this.valuetext}  />
						<span >Speed</span>
					</div>				 */}

					<div>
						<CreatableSelect isDisabled={this.state.isDisabled} defaultValue={barsOptions[1]} isClearable options={barsOptions} onChange={this.handleChange} className='dropdown' placeholder='Select bar count'  />
					</div>

					{/* <div className='slider text-center'>
						<Slider defaultValue={2} aria-label="Default" valueLabelDisplay="auto" min={5} max={20} step={5} marks getAriaValueText={this.handleChange}  />
						<span >Bar count</span>
					</div>				 */}

					<div className='pannel'>
						<Form
							formLabel='Speed'
							values={[1000, 750, 500, 250]}
							currentValue={this.state.delay}
							lables={['1x', '2x', '3x', '4x']}
							onChange={this.changeSpeed}
							disabled1={this.state.isDisabled}
						/>
					</div>

					<div className='control-buttons d-flex justify-content-center align-items-center'>

						<button disabled={this.state.isDisabled} className={`controller button  ${this.state.isDisabled ? "random-disabled" : ""}`} onClick={this.previousStep} title='prev step'>
							<Backward />
						</button>


						{playButton}

						<button disabled={this.state.isDisabled} className={`controller button  ${this.state.isDisabled ? "random-disabled" : ""}`} onClick={this.nextStep} title='next step'>
							<Forward />
						</button>

					</div>
				</div>
				<div className='pannel'></div>
			</div>
		);
	}
}

export default App;
