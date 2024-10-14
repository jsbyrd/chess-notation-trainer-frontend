-- Here just in case I want to generate some fake data (change UUIDs)

-- Step 1: Delete all previous entries for username = 'username'
DELETE FROM mm_analytics WHERE username = 'username';

-- Step 2: Insert 20 new game entries with realistic ups and downs in performance
INSERT INTO mm_analytics (game_id, username, date, score, total, skips) VALUES
-- First 5 entries: Slow start with some struggles
('550e8400-e29b-41d4-a716-446655440000', 'username', '2024-10-13', 1, 4, 2),
('550e8400-e29b-41d4-a716-446655440001', 'username', '2024-10-13', 2, 4, 1),
('550e8400-e29b-41d4-a716-446655440002', 'username', '2024-10-13', 3, 6, 2),
('550e8400-e29b-41d4-a716-446655440003', 'username', '2024-10-13', 2, 5, 2), -- Small dip
('550e8400-e29b-41d4-a716-446655440004', 'username', '2024-10-13', 4, 7, 1),

-- Next 5 entries: Gradual improvement, with one setback
('550e8400-e29b-41d4-a716-446655440005', 'username', '2024-10-13', 5, 8, 1),
('550e8400-e29b-41d4-a716-446655440006', 'username', '2024-10-13', 7, 10, 1),
('550e8400-e29b-41d4-a716-446655440007', 'username', '2024-10-13', 6, 9, 0), -- Slight drop
('550e8400-e29b-41d4-a716-446655440008', 'username', '2024-10-13', 8, 11, 1),
('550e8400-e29b-41d4-a716-446655440009', 'username', '2024-10-13', 9, 12, 1),

-- Middle phase: More fluctuations to mimic natural performance changes
('550e8400-e29b-41d4-a716-446655440010', 'username', '2024-10-13', 11, 13, 1),
('550e8400-e29b-41d4-a716-446655440011', 'username', '2024-10-13', 10, 14, 2), -- Performance dip
('550e8400-e29b-41d4-a716-446655440012', 'username', '2024-10-13', 12, 15, 1),
('550e8400-e29b-41d4-a716-446655440013', 'username', '2024-10-13', 11, 15, 0), -- Another drop
('550e8400-e29b-41d4-a716-446655440014', 'username', '2024-10-13', 13, 16, 2),

-- Final stretch: Performance stabilizes and improves, with one last dip
('550e8400-e29b-41d4-a716-446655440015', 'username', '2024-10-13', 15, 18, 1),
('550e8400-e29b-41d4-a716-446655440016', 'username', '2024-10-13', 14, 17, 0), -- Slight decline
('550e8400-e29b-41d4-a716-446655440017', 'username', '2024-10-13', 16, 19, 1),
('550e8400-e29b-41d4-a716-446655440018', 'username', '2024-10-13', 17, 20, 0),
('550e8400-e29b-41d4-a716-446655440019', 'username', '2024-10-13', 18, 20, 0);