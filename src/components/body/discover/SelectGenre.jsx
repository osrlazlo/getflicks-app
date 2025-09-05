
function SelectGenre() {

    async function fetchGenres() {
    const res = await fetch("https://getflicks-app.vercel.app/api/genres");
    const data = await res.json();
    console.log(data);
    }

    fetchGenres();

    return(
        <>

        </>
    )
}

export default SelectGenre