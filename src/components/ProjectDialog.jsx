import Modal from './Modal'
import ProvitDetails from './ProvitDetails'
import FradeDetails from './FradeDetails'

export default function ProjectDialog({ projectId, onClose }) {
  return (
    <Modal className="detail-dialog" labelledBy="detail-title" heading="PROJECT DETAILS" closeLabel="프로젝트 상세 닫기" onClose={onClose}>
      {projectId === 'provit' ? <ProvitDetails /> : <FradeDetails />}
    </Modal>
  )
}
