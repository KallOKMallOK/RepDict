import React from 'react';

import "../styles/components.scss"


interface IProps{
	info: Object
}


const Currsection: React.FC<IProps> = ({info}) => {
  return (
	<section className="lesson_section lesson_info">
			{
				Object.keys(info).map((key: string, index: number) => {
					return (
						<p className="lesson_info_item">
							<span className="lesson_info_item_key">
								{key}:
							</span>
							<span className="lesson_info_item_value">
								{Object.values(info)[index]}
							</span>
						</p>
					)
				})
			}
			
	</section>
  );
}

export default Currsection;
