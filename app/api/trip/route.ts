import {getDb} from "../../../db";
import {expenses,settings} from "../../../db/schema";
import {eq,desc} from "drizzle-orm";
import {z} from "zod";
const expense=z.object({id:z.string().uuid(),description:z.string().trim().min(1).max(150),amount:z.number().int().positive().max(100000000),person:z.enum(["first","second"]),method:z.enum(["credit","cash","debit"]),category:z.enum(["food","souvenirs","clothes","stay","transport","activities","other"]),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s=>!isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s),city:z.string().trim().max(80),shared:z.boolean()});
export async function GET(){try {const db=getDb();const rows=await db.select().from(expenses).orderBy(desc(expenses.date),desc(expenses.id));const [config]=await db.select().from(settings).where(eq(settings.id,1));return Response.json({expenses:rows,settings:config??{first:"Yo",second:"Mi novia",budget:0}},{headers:{"Cache-Control":"no-store"}});}catch{return Response.json({error:"No pudimos cargar el viaje. Volvé a intentar."},{status:500});}}
export async function POST(req:Request){
if(req.headers.get("sec-fetch-site")==="cross-site")return Response.json({error:"Solicitud no permitida"},{status:403});
try {const b=z.object({action:z.string(),settings:z.unknown().optional(),id:z.unknown().optional(),expense:z.unknown().optional()}).parse(await req.json());const db=getDb();
if(b.action==="settings"){const s=z.object({first:z.string().trim().min(1).max(30),second:z.string().trim().min(1).max(30),budget:z.number().int().min(0).max(100000000)}).parse(b.settings);await db.insert(settings).values({id:1,...s}).onConflictDoUpdate({target:settings.id,set:s});}
else if(b.action==="delete"){const id=z.string().uuid().parse(b.id);await db.delete(expenses).where(eq(expenses.id,id));}
else if(b.action==="save"){const e=expense.parse(b.expense);await db.insert(expenses).values(e).onConflictDoUpdate({target:expenses.id,set:e});}
else return Response.json({error:"Acción inválida"},{status:400});
return Response.json({ok:true});}catch(e){return Response.json({error:e instanceof z.ZodError?"Revisá los datos ingresados.":"No pudimos guardar los cambios. Intentá de nuevo."},{status:e instanceof z.ZodError?400:500});}}
