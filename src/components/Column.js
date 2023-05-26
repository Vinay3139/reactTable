import { format } from "date-fns"

export const columns=[
    {
        Header:"Id",
        accessor:"id"
    },
    {
       Header:"First_Name",
       accessor:"first_name"
    },
    {
       Header:"Last_Name",
       accessor:"last_name"
    },
    {
       Header:"age",
       accessor:"age"
    }
    ,
    {
       Header:"date_of_birth",
       accessor:"date_of_birth",
       Cell:({value})=>{return format( new Date(value),"dd/MM/yyyy")}
    }
    ,
    {
       Header:"Phone",
       accessor:"phone"
    },
    {
       Header:"Country",
       accessor:"country"
    },
    {
       Header:"e-mail",
       accessor:"email"
    }
]