import { useRouter } from "next/router"
import styles from "@/styles/Resultado.module.css"
import Estatistica from "@/components/Estatistica"
import Botao from "@/components/Botao"

export default function resultado(){
    const router = useRouter()
    const total = +router.query.total
    const certas = +router.query.certas
    const percentual = Math.round((certas/total) * 100)
    return(
        <div className={styles.resultado}>
            <h1>Resultado final</h1>
            <div style={{display: "flex"}}>
                <Estatistica texto={"Perguntas"} valor = {total}/>
                <Estatistica texto={"Acertos"} valor = {certas}
                corFundo={certas>total/2 ? "#9CD2A4" : "#DE6A33"}/>
                <Estatistica texto={"Porcentagem"} valor = {`${percentual}%`}
                corFundo={percentual > 50? "#9CD2A4":"#DE6A33"}/>

            </div>
            <Botao href="/" texto="Tentar Novamente"/>
        </div>
    )
}