import { useRealtimeDatabase, useRemoveFromDatabase, useUpdateDatabase, useWriteToDatabase, useGetDatabaseKeys, usePushToDatabase} from '../../functions/firebase'

// 사용 예시
export default function RealtimeDatabaseReferenceComponent(){
    // 실시간 데이터 구독
    const { data, loading, error } = useRealtimeDatabase('users/123');
    
    // 데이터 쓰기
    const { writeData, loading: writeLoading } = useWriteToDatabase();
    
    // 데이터 업데이트
    const { updateData, loading: updateLoading } = useUpdateDatabase();
    
    // 데이터 삭제
    const { removeData, loading: removeLoading } = useRemoveFromDatabase();
  
    const { getKeys } = useGetDatabaseKeys();
    const { pushData } = usePushToDatabase();

    
    const handleSave = async () => {
      await writeData('users/123', { name: '홍길동', age: 25 });
    };
  
    const handleUpdate = async () => {
      await updateData('users/123', { age: 26 });
    };
  
    const handleDelete = async () => {
      await removeData('users/123');
    };
  
     // 특정 경로의 모든 키 가져오기
    const handleGetKeys = async () => {
        const keys = await getKeys('users');
        console.log('모든 키 값:', keys); // ['key1', 'key2', 'key3', ...]
    };

    // 배열처럼 데이터 추가하기
    const handlePushData = async () => {
        const { success, key } = await pushData('users', {
        name: '홍길동',
        age: 25
        });
        if (success) {
        console.log('새로 생성된 키:', key);
        }
    };
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;
  
    return (
      <div>
        <div>데이터: {JSON.stringify(data)}</div>
        <button onClick={handleSave}>저장</button>
        <button onClick={handleUpdate}>업데이트</button>
        <button onClick={handleDelete}>삭제</button>

        <button onClick={handleGetKeys}>키 값 가져오기</button>
        <button onClick={handlePushData}>데이터 추가하기</button>
      </div>
    );
  };