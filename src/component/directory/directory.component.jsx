import { DIRECTORY_DATA } from './directory-data';
import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss';

const Directory = () => {

    const categories = DIRECTORY_DATA;

    return(
        <div className='categories-container'>
            {
                categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))
            }
        </div>
    )
}

export default Directory;