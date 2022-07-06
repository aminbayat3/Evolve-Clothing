import { DIRECTORY_DATA } from './directory-data';
import CategoryItem from '../category-item/category-item.component';

import { CategoriesContainer } from './directory.styles';

const categories = DIRECTORY_DATA; // notice that we put the categories outside of the Directory component

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