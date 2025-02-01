import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import UploadWidget from "@/pages/api/UploadWidget";

export default function ProductForm({
    _id,
    title: existingTitle = '',
    description: existingDescription = '',
    price: existingPrice = '',
    images: existingImages = [],
    category: assignedCategory = '',
    properties: assignedProperties = {},
}) {
    const [title, setTitle] = useState(existingTitle);
    const [description, setDescription] = useState(existingDescription);
    const [category, setCategory] = useState(assignedCategory);
    const [productProperties, setProductProperties] = useState(assignedProperties);
    const [price, setPrice] = useState(existingPrice);
    const [images, setImages] = useState(existingImages);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories')
            .then(result => setCategories(result.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {
            title, description, price, images, category,
            properties: productProperties,
        };

        try {
            if (_id) {
                // Update existing product
                await axios.put('/api/Products.api', { ...data, _id });
            }
            else {
                // Create new product
                await axios.post('/api/Products.api', data);
            }
            setGoToProducts(true);
        }
        catch (error) {
            console.error("Error saving product:", error);
        }
    }

    if (goToProducts) {
        router.push('/products');
    }

    function updateImagesOrder(newImages) {
        setImages(newImages);
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => ({
            ...prev,
            [propName]: value,
        }));
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        if (catInfo) {
            propertiesToFill.push(...catInfo.properties);
            while (catInfo?.parent?._id) {
                const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
                if (parentCat) {
                    propertiesToFill.push(...parentCat.properties);
                    catInfo = parentCat;
                }
            }
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="Product name"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
                required
            />

            <label>Category</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)} required>
                <option value="">Uncategorized</option>
                {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </select>

            {propertiesToFill.map(p => (
                <div key={p.name}>
                    <label>{p.name[0].toUpperCase() + p.name.slice(1)}</label>
                    <select
                        value={productProperties[p.name] || ""}
                        onChange={ev => setProductProp(p.name, ev.target.value)}
                    >
                        {p.values.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}

            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                    {images.map(link => (
                        <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border">
                            <img src={link} alt="Product image" className="rounded-lg" />
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <UploadWidget
                        uwConfig={{
                            cloudName: "dvwkhvavi",
                            uploadPreset: "Real Estate",
                            multiple: true,
                            maxImageFileSize: 10000000,
                            folder: "product-images",
                        }}
                        setState={setImages}
                        setPublicId={(publicId) => { }} />
                </label>
            </div>

            <label>Description</label>
            <textarea
                placeholder="Description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                required
            />

            <label>Price</label>
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
                required
            />

            <button type="submit" className="btn-primary">
                Save
            </button>
        </form>
    );
}