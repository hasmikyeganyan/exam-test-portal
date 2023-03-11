export interface Exam {
    id: number | string;
    name?: string;
    title: string;
    description: string | undefined;
    fileUrl: string | undefined;
    hidden: boolean;
}