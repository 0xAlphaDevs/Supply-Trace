import CreateProductForm from '@/components/createProduct/createProductform'
import React from 'react'
import Navbar from '@/components/navbar'

const CreateProduct = () => {
    return (
        <section className="flex flex-col justify-between px-8 py-4 ">
            <Navbar />
            <div className='py-10'>
                <CreateProductForm />
            </div>
        </section>
    )
}

export default CreateProduct