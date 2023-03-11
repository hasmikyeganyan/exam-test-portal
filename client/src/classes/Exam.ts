class Exam{
    public id: number | undefined;
    public title: string;
    public description: string;
    public pdfAddress: string | undefined; // in case instructors provide a pdf file

    constructor(id: number | undefined, title: string, description: string, pdfAddress: string | undefined) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.pdfAddress = pdfAddress;
    }
}


export default Exam;