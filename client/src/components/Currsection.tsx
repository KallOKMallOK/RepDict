import React from 'react';

import "../styles/components.scss"


interface IProps{
	info: Record<string, string | number>
	className?: string
}


const Currsection: React.FC<IProps> = ({info, className}) => {
  return (
	<section className={`currsection ${className || ""}`}>
			{
				Object.keys(info).map((key: string, index: number) => {
					return (
						<p className="currsection__item" key={index}>
							<span className="currsection__item_key">
								{key}:
							</span>
							<span className="currsection__item_value">
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
