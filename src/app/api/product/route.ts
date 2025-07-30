'use server'
import { client } from '@/lib/mongoDB/mongodb.js'
import { ObjectId } from 'mongodb';



const productsCollection = client.db("Ecommerce").collection("products");



export async function GET(request: any) {

    const response = await productsCollection.find({}).toArray();

    return Response.json({
        response: response,
        message: "Products fetched successfully"
    })
}


export async function POST(request: any) {
    const product = await request.json();

    if (!product.title || !product.price || !product.category || !product.description || !product.image) {
        return Response.json({
            message: "All fields are required"
        }, { status: 400 });
    }

    const response = await productsCollection.insertOne({
        title: product.title,
        category: product.category,
        description: product.description,
        image: product.image,
        price: product.price
    });

    return Response.json({
        _id: response.insertedId,
        message: "Product added successfully"
    });
}



export async function PUT(request: any) {
    const product = await request.json();

    if (!ObjectId.isValid(product._id)) {
        return Response.json({
            message: "Invalid product ID"
        }, { status: 400 });
    }

    if (!product.title && !product.price && !product.description && !product.image) {
        return Response.json({
            message: "Field is required"
        }, { status: 400 });
    }

    interface Product {
        title: string;
        price: number;
        description: string;
        image: string;
        category: string;
    }

    let updateFields : Partial<Product> = {};
    if (product.title) updateFields.title = product.title;
    if (product.price) updateFields.price = product.price;
    if (product.description) updateFields.description = product.description;
    if (product.image) updateFields.image = product.image;
    if (product.category) updateFields.category = product.category;


    const response = await productsCollection.updateOne({
        _id: new ObjectId(product._id)
    },
        {
            $set: {
                ...updateFields
            }
        }
    );
    console.log("Response:", response);
    if (response.modifiedCount === 0) {
        return Response.json({
            message: "Product not found or no changes made"
        }, { status: 404 });
    }
    return Response.json({
        response: response,
        message: "Product updated successfully"
    });
}


export async function DELETE(request: any) {
    const product = await request.json();

    if (!ObjectId.isValid(product._id)) {
        return Response.json({
            message: "Invalid product ID"
        }, { status: 400 });
    }
    const response = await productsCollection.deleteOne({
        _id: new ObjectId(product._id)
    });
    console.log("Delete Response:", response);
    if (response.deletedCount === 0) {
        return Response.json({
            message: "Product not found"
        }, { status: 404 });
    }

    return Response.json({
        response: response,
        message: "Product deleted successfully"
    });
}