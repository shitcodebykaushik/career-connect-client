



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PageHeader from '../components/PageHeader';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/all-jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched job details:', data);
                setJob(data);
            })
            .catch(err => console.error('Error fetching job details:', err));
    }, [id]);

    const handleApply = async () => {
        const { value: url } = await Swal.fire({
            input: 'url',
            inputLabel: 'Your URL',
            inputPlaceholder: 'Enter Link to Your CV/Portfolio',
        });
        if (url) {
            Swal.fire(`Your CV/Portfolio Link: ${url}`).then(() => {
                alert("Applied Successfully!");
                window.location.reload();
            });
        }
    };

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-8">
            <PageHeader title="Job Details" path="Job Details" />
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                    <img src={job.companyLogo} alt={job.companyName} className="h-16 w-16 rounded-full mr-4" />
                    <div>
                        <h2 className="text-4xl font-bold mb-1">{job.jobTitle}</h2>
                        <h3 className="text-xl text-gray-600">{job.companyName}</h3>
                    </div>
                </div>
                <div className="text-gray-600 mb-4">
                    <span className="block mb-2"><strong>Location:</strong> {job.jobLocation}</span>
                    <span className="block mb-2"><strong>Salary:</strong> {job.minPrice} - {job.maxPrice} {job.salaryType}</span>
                    <span className="block mb-2"><strong>Posted on:</strong> {new Date(job.postingDate).toLocaleDateString()}</span>
                    <span className="block mb-2"><strong>Experience Level:</strong> {job.experienceLevel}</span>
                    <span className="block mb-2"><strong>Employment Type:</strong> {job.employmentType}</span>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2">Job Description</h3>
                    <p>{job.description}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2">Skills Required</h3>
                    {job.skills && job.skills.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {job.skills.map((skill, index) => (
                                <li key={index}>{typeof skill === 'object' ? JSON.stringify(skill) : skill}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No specific skills required.</p>
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2">Posted By</h3>
                    <p>{job.postedBy}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2">How to Apply</h3>
                    <p>Please provide a link to your CV or portfolio.</p>
                </div>
                <button
                    className="bg-blue px-8 py-2 text-white "
                    onClick={handleApply}
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobDetails;
