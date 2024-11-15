function TitleSection({sectionName, img}){
    return (
        <div class="w-full flex items-center mb-6 gap-3">
                <img src={img} alt="" class="size-8"/>
                <h1 class="min-w-[300px] text-2xl font-semibold text-secondaryBlue">{sectionName}</h1>
        </div>
    )
}

export default TitleSection;