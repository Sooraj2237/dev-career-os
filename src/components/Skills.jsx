import PageHeader from "./PageHeader"

function Skills() {
    return (
    <>
        <PageHeader title="Skills"/>
        <div className="flex justify-between items-center mt-6">
            <div className="left-side">
                <h2>Skills</h2>
            </div>
            <div className="right-side flex flex-wrap gap-3 text-center">
                <input type="text" name="skill-search" className="border rounded w-64 px-5 py-1" placeholder="Search for a Skill" />
                <button className="border rounded px-5 py-2">+Add</button>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">Skill</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-2">Target</div>
                    <div className="col-span-4">Notes</div>
                    <div className="col-span-1">Action</div>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-3 py-3">HTML</div>
            <div className="col-span-2 border rounded py-2 flex justify-evenly items-center">
                <button className="border rounded text px-3 py-1">+</button>
                <p>5</p>
                <button className="border rounded text px-3 py-1">-</button>
            </div>
            <div className="col-span-2 flex justify-center">
                <select className="border rounded w-full px-3" defaultValue="5">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="col-span-4 flex justify-center">
                <input type="text" name="notes" className="border rounded w-full px-3" placeholder="What's next?"/>
            </div>
            <div className="col-span-1 flex justify-center">
                <button className="border rounded w-full">Delete</button>
            </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium">
            Rule: Target 4/5 on core stack + be able to explain decisions.
        </p>
    </>
    )
}

export default Skills