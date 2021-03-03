import Plant from 'components/Plant'

function Home(props){
    return (
        <div className={'Home', 'page'}>
            <Plant species={props.species}></Plant>
        </div>
    );
}

export default Home