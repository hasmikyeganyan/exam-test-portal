import { Table } from "../components/Table";
import { InstructorLayout } from "../layouts/InstructorLayout";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getAllExamResults, updateExamResult } from "../redux/examResultsSlice";
import { RootState } from "../store/store";
import { IExamResult } from "../models/userModel";
import { deleteExam, downloadExamResults, evaluateCandidate, searchExamResults } from "../services/examResultService";
import EvaluateModal from "../components/instructor_home/EvaluateModal";
import SearchBar from "../components/SearchBar";
import toast from "react-hot-toast";
export const ExamResults = () => {
    const dispatch = useDispatch();
    const [activeStudent, setActiveStudent] = useState<IExamResult | null | undefined>(null)
    const { results } = useSelector((state: RootState) => state.examResults);
    const { user } = useSelector((state: RootState) => state.auth);
    const [tableData, setTableData] = useState<IExamResult[] | null | undefined>([]);

    const isAdmin = user?.role?.name === "Admin";


    useEffect(() => {
        dispatch(getAllExamResults())
    }, [])

    useEffect(() => {
        setTableData(results.map((result) => ({
            id: result?.id,
            name: result?.user?.name,
            lastname: result?.user?.lastname,
            email: result?.user?.email,
            score: result.score
        })));
    }, [results]);

    const handleDownloadExam = (fileUrl: string) => {
        downloadExamResults(fileUrl);
    };

    const openEvaluateModal = (id: number) => {
        setActiveStudent(results.find(r => r.id === id))
    }

    const handleDelete = (id: number) => {
        deleteExam(id).then(() => {
            dispatch(updateExamResult(results.filter(r => r.id !== id)))
        })
    }

    const handleEvaluate = (score: number) => {
        evaluateCandidate(score, activeStudent?.id as number).then(() => {
            dispatch(updateExamResult(results.map(r => r.id === activeStudent?.id ? { ...r, score } : { ...r })))
            setActiveStudent(null);
        })
    }

    const handleSearch = async (searchString: string) => {
        const searchResult = await searchExamResults(searchString);
        if (searchResult.length == 0) return toast.error("No such exam results found")
        setTableData(searchResult.map(result => ({
            id: result?.id,
            name: result?.user?.name,
            lastname: result?.user?.lastname,
            email: result?.user?.email,
            score: result.score
        })));
    }

    const handleClear = () => {
        setTableData(results.map((result) => ({
            id: result?.id,
            name: result?.user?.name,
            lastname: result?.user?.lastname,
            email: result?.user?.email,
            score: result.score
        })));
    }

    return (
        <InstructorLayout title="Exams Board">
            <SearchBar onSearch={handleSearch} onClear={handleClear} />
            {results ? <Table<IExamResult>
                columns={["ID", "Name", "Lastname", "Email", "Score", "Actions"]}
                data={tableData!}
                additionalData={results?.map((result) => ({ fileUrl: result?.fileUrl }))}
                actions={isAdmin ? ['delete'] : ['delete', "download", "evaluate"]}
                onDownload={handleDownloadExam}
                onDelete={handleDelete}
                onEvaluate={openEvaluateModal}
            ></Table> : null}
            <EvaluateModal
                isOpen={activeStudent !== null}
                activeStudent={activeStudent}
                onRequestClose={() => setActiveStudent(null)}
                onSubmit={handleEvaluate}
            />
        </InstructorLayout>
    );
};
