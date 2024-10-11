import { ObjectId, model, Schema } from "mongoose";

export interface experienciasInterface{
    owner: ObjectId,
    participants: ObjectId[],
    description: string
}

export const experienciasSchema = new Schema<experienciasInterface>({
    owner: {type: Schema.Types.ObjectId, ref:'user'},
    participants: [{type: Schema.Types.ObjectId, ref:'user'}],
    description: String
})

export const experienciasofDB = model<experienciasInterface>('experiencias',experienciasSchema)