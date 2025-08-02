import { client } from '@/lib/mongoDB/mongodb.js'
import bcrypt from 'bcrypt';


const usersCollection = client.db("Ecommerce").collection("users");

export async function POST(request: Request) {

    const body = await request.json();

    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        return Response.json({
            message: "All fields are required"
        }, { status: 400 });
    }
    try {
        body.email = body.email.toLowerCase();
        const response = await usersCollection.findOne({ email: body.email });
        if (response) {
            return Response.json({
                message: "User already exists"
            }, { status: 400 });
        } else {

            const myPlaintextPassword = body.password;
            let hash;

            try {

                const saltRounds = await bcrypt.genSalt()
                console.log(saltRounds)
                hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
                console.log(hash);

            } catch (error) {
                console.log(error)
                Response.json({
                    message: "Error in hash creation"
                }, { status: 500 });
            }
            const response = await usersCollection.insertOne({
                isAdmin:false,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hash,
                createdOn: new Date(),
            });

            return Response.json({
                response: response,
                message: "User added successfully"
            }, { status: 201 });
        }
    }
    catch (error) {
        return Response.json({
            message: "Error checking user existence"
        }, { status: 500 });
    }

}
