import React , {useEffect,useState}  from 'react'
import { TextField } from '@material-ui/core';
import "../../App.css";


const TagsInput = (props) => {
	const {name,setFieldValue,placeholder} = props;
	const [tagVal, setTagVal] = useState([]);

	useEffect(() => {
		setFieldValue(name,[...tagVal])
	}, [setFieldValue,name , tagVal])
	
	const removeTags = indexToRemove => {

		setTagVal([...tagVal.filter((_, index) => index !== indexToRemove)]);
	};

	const addTags = (event) => {
		if (event.target.value !== "") {
				setTagVal([...tagVal, event.target.value]);
			    event.target.value = "";
			}

	
	};
	return (
		<>
		<div className="tags-input">
			<ul id="tags">
				{tagVal.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon '
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<TextField
					
               type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder={placeholder}
				
			/>
		</div>
		</>
	);
};

export default TagsInput




