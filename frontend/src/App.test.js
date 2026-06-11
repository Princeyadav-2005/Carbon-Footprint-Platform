import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App'; // Agar App.jsx root me hai toh './App' check kar lena

// 1. Mocking global fetch API to test secure network communication securely
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('EcoSphere Pro v2.0 - Comprehensive Verification Suite', () => {
  
  // Test 1: DOM Structure & Usability/Accessibility Roles
  test('renders application layout with proper accessibility landmarks', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /EcoSphere/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /Carbon Metrics Analyzer Form/i })).toBeInTheDocument();
  });

  // Test 2: Input Elements Subsystem Interaction
  test('allows validation configurations across numeric element parameters', () => {
    render(<App />);
    const electricityInput = screen.getByLabelText(/Monthly Electricity/i);
    const transportInput = screen.getByLabelText(/Monthly Travel Distance/i);
    const transportSelect = screen.getByLabelText(/Primary Transport Mode/i);

    fireEvent.change(electricityInput, { target: { value: '350' } });
    fireEvent.change(transportInput, { target: { value: '1200' } });
    fireEvent.change(transportSelect, { target: { value: 'electric' } });

    expect(electricityInput.value).toBe('350');
    expect(transportInput.value).toBe('1200');
    expect(transportSelect.value).toBe('electric');
  });

  // Test 3: API Integration Mocking, Loading States, & Result Rendering
  test('manages submission life-cycle workflows and evaluates async response structures', async () => {
    const mockApiResponse = {
      summary: { totalEmissions: 150, sustainabilityScore: 82, treesNeeded: 8 },
      breakdown: { electricity: 90, transport: 60 },
      recommendations: ['Transition to localized dynamic solar fixtures', 'Optimize vehicle tires pressure metrics']
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<App />);
    
    // Fill up form fields
    fireEvent.change(screen.getByLabelText(/Monthly Electricity/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/Monthly Travel Distance/i), { target: { value: '400' } });
    
    // Target action invocation
    const submitButton = screen.getByRole('button', { name: /Analyze environmental impacts/i });
    fireEvent.click(submitButton);

    // Validate active async tracking button UI transitions
    expect(submitButton).toHaveTextContent(/Processing Insights.../i);

    // Verification step for dynamic UI calculations
    await waitFor(() => {
      expect(screen.getByText(/Audit Results/i)).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('82/100')).toBeInTheDocument();
      expect(screen.getByText(/Transition to localized dynamic solar fixtures/i)).toBeInTheDocument();
    });
  });

  // Test 4: Exception Resilience & Security Boundaries Validation
  test('captures and handles network fault rejections safely without breaking thread execution', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network operational failure'));
    window.alert = jest.fn(); // Suppress actual alert window trigger inside node runtime

    render(<App />);
    fireEvent.change(screen.getByLabelText(/Monthly Electricity/i), { target: { value: '150' } });
    fireEvent.change(screen.getByLabelText(/Monthly Travel Distance/i), { target: { value: '300' } });

    const submitButton = screen.getByRole('button', { name: /Analyze environmental impacts/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Submission processing error'));
      expect(submitButton).toHaveTextContent(/Analyze Impacts/i);
    });
  });
});