function TitleSection({sectionName, img}){
    return (
        <div className="w-full flex items-center mb-6 gap-3">
                <img src={img} alt="" className="size-8"/>
                <h1 className="min-w-[300px] text-2xl font-semibold text-secondaryBlue">{sectionName}</h1>
                <div className="w-full h-full border-b-4 border-dotted border-secondaryBlue text-transparent"></div>
        </div>
    )
}

export default TitleSection;