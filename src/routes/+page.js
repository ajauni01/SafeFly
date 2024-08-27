import { redirect } from "@sveltejs/kit";

export function load({url}){
    redirect(301, '/Home')
}