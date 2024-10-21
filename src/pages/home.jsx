import '../styles/home.css'
export default function Home() {
    return (
        <div className="home">
            <img src="../../public/storage/img/background.png" alt="" className="imagenHome" />
            <div className="header">
                <h2>Kharkvi, Ukranie</h2>
                <img src="../../public/storage/img/search_white.png" alt="" />
            </div>
            <div className="clima">
                <div className="temperatura">
                    <h1>3º</h1>
                    <h3>Feels like -2º</h3>
                </div>
                <div className="imagenclima">
                    <img src="../../public/storage/img/solecito.svg" alt="" className="climasol" />
                    <h2>Cloudy</h2>
                </div>
            </div>
                <div className="botton">
                    <h2>January 18, 16:14</h2>
                    <div className="day">
                        <h2>Day 3º</h2>
                        <h2>Night -1º</h2>
                    </div>
                </div>
        </div>
    )
}