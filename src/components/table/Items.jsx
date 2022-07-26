import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { ADMIN_REPORTS } from '../../utils/consts';
import { Link } from "react-router-dom";
import BtnLine from '../buttons/BtnLine';
import BtnCircle from '../buttons/BtnCircle';


const sliceTxt = (text, num) => {
	return text.substr(0, num) + ((text.length >= num) && '...')
}

function Items({ currentItems, setListActive, listActive, fullListKeys }) {

	const [mobileSize, setMobileSize] = useState(false);

	const funkResize = () => {
		(window.innerWidth >= 992) ?
			setMobileSize(false) :
			setMobileSize(true) ;
	}

	useEffect(() => {
		window.addEventListener('resize', funkResize)
		return () => {
			window.removeEventListener('resize', funkResize)
		}
	}, [])
	

	const onChange = (key) => {
		listActive === null ? setListActive([key]) :
		listActive === 'oll' ? setListActive([...fullListKeys.filter(id => id !== key)]) : 
		listActive.includes(key) ? listActive.length <= 1 ? setListActive(null) :
		setListActive([...listActive.filter(id => id !== key)]) :
		setListActive([...listActive, key])
	}

  return (
    <>
      {currentItems && currentItems.map((item) => {
				const activeStatus = 
					listActive === null ? false :
					listActive === 'oll' ? true : 
					listActive.includes(item.id)

				const localOnChange = () => {
					onChange(item.id)
				}

				return <tr key={item.id} className="tableInfo__item" >
            <td className=''>
							<label className='inputCheckBox'>
								<input type="checkbox" checked={activeStatus} onChange={localOnChange} />
								<div><Icon type="check" /></div>
							</label>
						</td>
						<td className="txt12x14 w700">{item.country}</td>
						<td className="txt12x14 w700">{mobileSize ? (item.name.split(' ').map(item => sliceTxt(item, 3)).join(' ')) : item.name}</td>
						<td className="txt12x14 w700">{mobileSize ? sliceTxt(item.bank, 8) : item.bank}</td>
						<td className="txt12x14 w700">{mobileSize ? sliceTxt(item.number, 8) : item.number}</td>
						<td>
							<Link to={ADMIN_REPORTS + '/' + item.id} className="tableInfo__more">
								{!mobileSize && <BtnLine>More</BtnLine>}
								<BtnCircle><Icon type="arrowRight" /></BtnCircle>
							</Link>
						</td>
          </tr>
			})}
    </>
  );
}

export default Items