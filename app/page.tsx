'use client';

import React, { useState } from "react";

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

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, position: "relative" }}>
      {/* 안내 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#2563EB",
          color: "white",
          padding: "8px 12px",
          borderRadius: 8,
          cursor: "pointer",
          border: "none",
        }}
      >
        🧠 J.A.R.V.I.S. 안내
      </button>

      <h1 style={{ textAlign: "center" }}>📘 성과 기반 보상 시스템</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        과목 이름과 점수를 입력하면 자동으로 보상금이 계산됩니다.
      </p>

      {/* 과목 추가 폼 */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="새 과목 이름"
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={handleAddSubject}>추가</button>
      </div>

      {/* 과목 리스트 */}
      {subjects.map((subject, index) => {
        const score = parseInt(scores[index], 10);
        const reward = isNaN(score) ? "-" : `${getReward(score).toLocaleString()}원`;

        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 2fr auto",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div>{subject}</div>
            <input
              type="number"
              placeholder="점수"
              value={scores[index]}
              onChange={(e) => handleScoreChange(index, e.target.value)}
              style={{ padding: 6 }}
            />
            <div>보상: {reward}</div>
            <button onClick={() => handleRemoveSubject(index)}>❌</button>
          </div>
        );
      })}

      <div style={{ marginTop: 20, textAlign: "right", fontWeight: "bold" }}>
        총 보상: {totalReward.toLocaleString()}원
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              maxWidth: 700,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                fontSize: 20,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              ✖️
            </button>

            <h2>🧠 J.A.R.V.I.S. 학습 성과 프로그램 활성화됨</h2>
            <p><strong>“안녕하세요. 당신의 학습 성장을 지원하는 J.A.R.V.I.S.입니다.”</strong></p>
            <p>새로운 성과 기반 보상 시스템이 시작되었습니다.</p>
            <p>각 과목의 점수를 입력하면 자동으로 보상금이 계산됩니다.</p>
            <p>보상 기준:</p>
            <ul>
              <li>95점 이상: 100,000원</li>
              <li>90점 이상: 50,000원</li>
              <li>85점 이상: 30,000원</li>
              <li>80점 이상: 10,000원</li>
              <li>80점 미만: 0원</li>
            </ul>
            <p>💡 성적을 올릴수록 더 높은 보상이 주어집니다!</p>
          </div>
        </div>
      )}
    </div>
  );
}
