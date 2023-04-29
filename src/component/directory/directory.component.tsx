import { DIRECTORY_DATA } from './directory-data';
import CategoryItem from '../directory-item/directory-item.component';

const categories = DIRECTORY_DATA;

const Directory = () => {

    return(
        <div className='w-100 row space-between'>
            {
                categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))
            }
        </div>
    )
}

export default Directory;