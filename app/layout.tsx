import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Europa juntos · Nuestro viaje",description:"Menos cuentas, más recuerdos. Los gastos de nuestro viaje a Europa, en un solo lugar."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
