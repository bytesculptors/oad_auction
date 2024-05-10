import { IProcessItem } from '@/types/bid.type';
import CommentItem from '../CommentItem';

const ProcessItem: React.FC<IProcessItem> = ({ amount, ...props }) => {
    return <CommentItem {...props} content={`Place bid: ${amount} VND`} />;
};

export default ProcessItem;
