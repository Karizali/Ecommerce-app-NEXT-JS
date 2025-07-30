import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { client } from '@/lib/mongoDB/mongodb.js'
import { cookies } from "next/headers";



const usersCollection = client.db("Ecommerce").collection("users");
const SECRET = process.env.SECRET;

export async function POST(request: any) {
    const body = await request.json();

    if (
        !body.email ||
        !body.password) {

        return Response.json({
            message: "Email or password is missing"
        }, {
            status: 400
        });
        ;
    }

    try {

        const email = body.email.toLowerCase();
        console.log(email)


        const projectFields = {
            firstName: 1,
            lastName: 1,
            email: 1,
            password: 1
        }

        const user = await usersCollection.findOne({ email: email }, {
            projection: projectFields
        })

        if (!user) {
            Response.json({
                message: "Email or Password is incorrect",
            }, {
                status: 404
            })
            return;
        } else {
            console.log(user)
            const match = await bcrypt.compare(body.password, user.password);

            if (match) {

                const token = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                }, SECRET);
                
                (await cookies()).set('Token', token, {
                    maxAge: 86_400_000,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });

                return Response.json({
                    message: "login successful",
                    profile: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        _id: user._id
                    }
                },
                    {
                        status: 200
                    });
            } else {
                return Response.json({
                    message: "Email or Password is incorrect"
                }, {
                    status: 401
                })
            }

        }

    } catch (error) {
        Response.json({
            message: "Error in fetching user's data from database"
        }, {
            status: 500
        })
    }


}

