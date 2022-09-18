export default function SearchBar({
    keyword,
    keywordChanged
}) {
    return(
        <div>
            <input
                type="text"
                name="searchWord"
                value={keyword}
                onChange={keywordChanged}
            />
        </div>
    )
}
