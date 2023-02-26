import { DIRECTORY_DATA } from './directory-data';
import CategoryItem from '../directory-item/directory-item.component';

import { CategoriesContainer } from './directory.styles';

const categories = DIRECTORY_DATA;

const Directory = () => {

    return(
        <CategoriesContainer>
            {
                categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))
            }
        </CategoriesContainer>
    )
}

export default Directory;