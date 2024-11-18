import Item from "./Item";

export default function Caixa({sectionName, items, type }){
    return(
        <>
            <div class="w-full min-w-[300px] mt-5 py-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
                <div class="w-full min-w-[200px] h-full flex justify-between px-6 items-center border-b-red-400 border-b-2">
                    <h1 class="text-xl font-bold text-secondaryBlue">{sectionName}</h1>
                </div>
                <div class="w-full min-w-[200px] h-full flex justify-start px-6">
                    <div className="mt-3">
                        {items.map((item, index)=>(
                            <Item key={index} item={item} type={type}></Item>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}