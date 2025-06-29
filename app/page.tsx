'use client';

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const getReward = (score: number): number => {
  if (score >= 95) return 100000;
  if (score >= 90) return 50000;
  if (score >= 85) return 30000;
  if (score >= 80) return 10000;
  return 0;
};

export default function StudentRewardTracker() {
  const [subjects, setSubjects] = useState<string[]>(["국어", "영어", "수학"]);
  const [scores, setScores] = useState<string[]>(Array(subjects.length).fill(""));
  const [newSubject, setNewSubject] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleScoreChange = (index: number, value: string) => {
    const updatedScores = [...scores];
    updatedScores[index] = value;
    setScores(updatedScores);
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    setSubjects([...subjects, newSubject]);
    setScores([...scores, ""]);
    setNewSubject("");
  };

  const handleRemoveSubject = (index: number) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    const updatedScores = scores.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
    setScores(updatedScores);
  };

  const totalReward = scores.reduce((sum, val) => {
    const score = parseInt(val, 10);
    return sum + (isNaN(score) ? 0 : getReward(score));
  }, 0);

  const chartData = subjects.map((subject, index) => ({
    name: subject,
    score: parseInt(scores[index], 10) || 0,
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      {/* 안내 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        🧠 J.A.R.V.I.S. 안내
      </button>

      <h1 className="text-3xl font-bold text-center mb-4">📘 성과 기반 보상 시스템</h1>
      <p className="text-center text-gray-600 mb-6">
        과목 이름과 점수를 입력하면 자동으로 보상금이 계산됩니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 왼쪽 그래프 */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">📊 점수 그래프</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#2563EB">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.score >= 95 ? '#16a34a' : entry.score >= 90 ? '#22c55e' : entry.score >= 85 ? '#eab308' : entry.score >= 80 ? '#f97316' : '#ef4444'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 오른쪽 입력 폼 */}
        <div className="md:col-span-2">
          {/* 과목 추가 */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="새 과목 이름"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            />
            <button
              onClick={handleAddSubject}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              추가
            </button>
          </div>

          {/* 과목 리스트 */}
          {subjects.map((subject, index) => {
            const score = parseInt(scores[index], 10);
            const reward = isNaN(score) ? "-" : `${getReward(score).toLocaleString()}원`;

            return (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 items-center mb-3 bg-white rounded-lg shadow-sm p-3"
              >
                <div>{subject}</div>
                <input
                  type="number"
                  placeholder="점수"
                  value={scores[index]}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1"
                />
                <div>보상: {reward}</div>
                <button onClick={() => handleRemoveSubject(index)} className="text-red-500">
                  ❌
                </button>
              </div>
            );
          })}

          <div className="text-right font-bold mt-4">
            총 보상: {totalReward.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl hover:text-red-500"
            >
              ✖️
            </button>

            <h2 className="text-xl font-bold mb-4">🧠 J.A.R.V.I.S. 학습 성과 프로그램 활성화됨</h2>

            <p className="mb-4">
              <strong>“안녕하세요. 당신의 학습 성장을 지원하는 J.A.R.V.I.S.입니다.”</strong><br />
              새로운 성과 기반 보상 시스템이 시작되었습니다.<br />
              학습 효율을 극대화하고, 정당한 보상을 받을 준비가 되셨다면 아래 정보를 확인해 주세요.
            </p>

            <h3 className="font-semibold mb-2">🎯 학업 성과 구간별 보상 규칙</h3>
            <table className="w-full mb-4 border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">점수 구간</th>
                  <th className="border px-2 py-1">보상 수준</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border px-2 py-1">95~100점</td><td className="border px-2 py-1">100,000원</td></tr>
                <tr><td className="border px-2 py-1">90~94점</td><td className="border px-2 py-1">50,000원</td></tr>
                <tr><td className="border px-2 py-1">85~89점</td><td className="border px-2 py-1">30,000원</td></tr>
                <tr><td className="border px-2 py-1">80~84점</td><td className="border px-2 py-1">10,000원</td></tr>
                <tr><td className="border px-2 py-1">79점 이하</td><td className="border px-2 py-1">없음 (피드백 분석 요청됨)</td></tr>
              </tbody>
            </table>

            <p className="mb-4">
              <em>“단 한 문제로 보상의 기회를 잃지 않도록, 점수는 성과 구간으로 판단합니다.”</em><br />
              완벽을 추구하되, 꾸준한 성장도 인정합니다.
            </p>

            <h3 className="font-semibold mb-2">⚙️ 노력 기반 보상 항목</h3>
            <p className="mb-4">
              시험 후 자기 피드백 리포트 제출 시 +50,000원<br />
              (만족한 점 / 아쉬운 점 / 보완할 점 / 구체적 방법 포함)<br />
              <em>“성과는 단기 결과가 아닌, 반복된 노력의 축적입니다.”</em><br />
              입력된 학습 데이터를 분석하여 습관 형성과 사고 회로 강화를 돕겠습니다.
            </p>

            <h3 className="font-semibold mb-2">💡 누적 성과 → 보너스 개념</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>1학기 평균 95점 이상 → +200,000원 + 휴식 1일</li>
              <li>모든 과목 90점 이상 → 휴식 1일</li>
            </ul>
            <p className="mb-4">
              <em>“단기 점수 외에도, 지속적인 집중과 성실함을 인식해 장기적 동기를 지원합니다.”</em><br />
              “학습 피로도를 분석하여 휴식 시간 제공 권장 중입니다.”
            </p>

            <hr className="my-4" />

            <p className="mb-2">
              <strong>📌 시스템 메시지</strong><br />
              📡 “당신의 목표: 단순한 점수 획득이 아닌, 자기 주도적 학습 루틴 구축”<br />
              🧠 “동기 → 실행 → 성찰 → 보상 → 반복. 이것이 인간의 성장 알고리즘입니다.”<br />
              🛡️ “성과는 축적되고, 당신의 학습 방어력은 강화됩니다.”
            </p>

            <hr className="my-4" />

            <p className="text-center font-semibold">
              🧬 READY TO ENGAGE.<br />
              필요 시, ‘목표 설정’, ‘전략 제안’, ‘피드백 분석’ 모듈을 호출해 주세요.<br />
              J.A.R.V.I.S.는 언제나 대기 중입니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
