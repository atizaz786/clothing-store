import {React} from 'react'
import { CategoryPreviewContainer, TitleContainer, PreviewContainer } from './category-preview.styles'
import Spinner from '../spinner/spinner.component'
import { useSelector } from 'react-redux'
import { selectCategoriesIsLoading } from '../../store/categories/category.selector'

import ProductCard from '../product-card/product-card.component'

const CategoryPreview = ({ title, products }) => {
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <CategoryPreviewContainer>
            <h2>
            <TitleContainer to={title}>{title.toUpperCase()}</TitleContainer>
            </h2>
            {
                isLoading ? <Spinner /> : 
                <PreviewContainer>
            {
                products?.filter((_, idx) => idx < 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))

            }
            </PreviewContainer>
            }
           
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview