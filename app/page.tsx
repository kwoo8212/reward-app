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
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
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
    </div>
  );
}

