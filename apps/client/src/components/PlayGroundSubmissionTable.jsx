import { useEffect, useState } from "react";
import axios from "axios";
import { getSubmissions } from "../api/submission";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiSearch
} from "react-icons/fi";
import { format } from "date-fns";
import { BorderBeam } from "./background/BorderBeam";

const PlayGroundSubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await getSubmissions(offset, limit);
      setSubmissions(response.submissions);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [offset, limit]);

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      finished: "bg-green-100 text-green-800",
      error: "bg-red-100 text-red-800"
    };
    return statusColors[status.toLowerCase()] || statusColors.default;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-bold text-gray-800">Submission History</h4>
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <FiLoader className="w-8 h-8 animate-spin text-blue-500" />
          </motion.div>
        ) : submissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-64 text-gray-500"
          >
            <img
              src="/empty-state.svg"
              alt="No submissions"
              className="w-32 h-32 mb-4"
            />
            <p className="text-lg">No submissions found</p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 relative">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Language", "Status", "Execution Time", "Date"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <motion.tr
                    key={submission._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission._id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-3 py-1 rounded-full bg-gray-100">
                        {submission.language}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.executionTime
                        ? `${submission.executionTime}s`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(submission.createdAt), "PPp")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={offset === 0}
            className="px-4 py-2 flex items-center space-x-2 bg-white border border-gray-200 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>

          <div className="flex items-center space-x-2">
            {[...Array(Math.ceil(totalCount / limit))].map((_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage =
                Math.floor(offset / limit) + 1 === pageNumber;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOffset((pageNumber - 1) * limit)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    isCurrentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={offset + limit >= totalCount}
            className="px-4 py-2 flex items-center space-x-2 bg-white border border-gray-200 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Next</span>
            <FiChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            fetchSubmissions();
          }}
          className="px-4 py-2 flex items-center space-x-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>Refresh</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PlayGroundSubmissionTable;
