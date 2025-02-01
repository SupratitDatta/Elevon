import styled from "styled-components";
import { useState } from "react";
import styles from "../styles/ProductImages.module.css"

const ImageButton = styled.div`
    ${props => props.active ? `border-color: #ccc;` : `border-color: transparent;`}
`;

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0]);
    return (
        <>
            <div className={`flex justify-center items-center ${styles.mainImg}`}>
                <img src={activeImage} className={styles.bigImg} />
            </div>
            <div className={`flex justify-center items-center g-4 ${styles.imageContainer}`}>
                {images.map(image => (
                    <ImageButton className={`h-auto w-20 ${styles.imageBtn}`}
                        key={image}
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)}>
                        <img src={image} alt="" className="image" />
                    </ImageButton>
                ))}
            </div>
        </>
    );
}