'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Card, Tab, Tabs, Typography } from '@mui/material'

import CommonTable from '@/common/CommonTable'
import CustomButton from '@/common/CustomButton'
import CustomLoader from '@/common/CustomLoader'
import { usePmaDashboardData } from '@/hooks/usePmaDashboardData'

interface ApiBranchData {
  branch_id: number
  branch_name: string
  region: string
  address: string
  postcode: string
  created_at: string
  status: string
  assigned_to: string
  created_by: {
    id: number
    name: string
    email: string
  }
}

interface ApiUserData {
  user_id: number
  username: string
  email: string
  branch: string | null
  user_type: string
  status: string
  created_at: string
}

type ApiTableData = ApiBranchData | ApiUserData

interface TableData {
  id: number
  name: string
  status: string
  location: string
  assignedTo: string
}

const BranchManagementSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  const router = useRouter()

  const filter = activeTab === 0 ? 'active_offices' : 'active_users'
  const { dashboardData, isLoading } = usePmaDashboardData({ filter })

  const tableData: TableData[] =
    dashboardData?.data?.items?.map((item: ApiTableData) => {
      if (filter === 'active_offices') {
        const branchItem = item as ApiBranchData

        return {
          id: branchItem?.branch_id,
          name: branchItem?.branch_name,
          status: branchItem?.status,
          location: `${branchItem?.region}`,
          assignedTo: branchItem?.assigned_to
        }
      } else {
        const userItem = item as ApiUserData

        return {
          id: userItem?.user_id,
          name: userItem?.username,
          status: userItem?.status,
          location: userItem?.branch || '--',
          assignedTo: userItem?.user_type
        }
      }
    }) || []

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleNavigate = () => {
    if (activeTab === 0) {
      router.push('/branch-management')
    } else {
      router.push('/user-management')
    }
  }

  const tableColumns = [
    {
      accessorKey: 'name',
      header: activeTab === 0 ? 'BRANCH NAME' : 'USERNAME',
      size: 200,
      cell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className={activeTab === 0 ? 'ri-building-line text-[#F59E0B]' : 'ri-user-line text-[#3B82F6]'}></i>
          </Box>
          <Typography sx={{ fontSize: '14px', color: '#374151' }}>{row.original.name}</Typography>
        </Box>
      )
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      size: 150,
      cell: ({ row }: any) => (
        <Typography
          sx={{
            fontSize: '14px',
            color: row.original.status === 'Active' ? '#10B981' : '#6B7280'
          }}
        >
          {row.original.status}
        </Typography>
      )
    },
    {
      accessorKey: 'location',
      header: activeTab === 0 ? 'LOCATION' : 'BRANCH',
      size: 150,
      cell: ({ row }: any) => (
        <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{row.original.location}</Typography>
      )
    },
    {
      accessorKey: 'assignedTo',
      header: activeTab === 0 ? 'ASSIGNED TO' : 'USER TYPE',
      size: 150,
      cell: ({ row }: any) => (
        <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>{row.original.assignedTo}</Typography>
      )
    }
  ]

  return (
    <Box sx={{ marginTop: 12, marginBottom: 4 }}>
      <Card
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            padding: 3,
            paddingBottom: 0
          }}
        >
          <CustomButton onClick={handleNavigate}>
            {' '}
            {activeTab === 0 ? 'View All Branches' : 'View All Users'}{' '}
          </CustomButton>
        </Box>
        <Box sx={{ paddingX: 3, paddingTop: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#35C0ED',
                height: '3px'
              },
              borderBottom: 'none'
            }}
          >
            <Tab
              icon={
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className='ri-thumb-up-line text-[20px]'></i>
                </Box>
              }
              iconPosition='start'
              label='Active Offices'
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#35C0ED',
                  fontWeight: 600
                },
                '& .MuiTab-iconWrapper': {
                  marginRight: '8px',
                  marginBottom: 0
                }
              }}
            />
            <Tab
              icon={
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className='ri-group-line text-[20px]'></i>
                </Box>
              }
              iconPosition='start'
              label='Active Users'
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#35C0ED',
                  fontWeight: 600
                },
                '& .MuiTab-iconWrapper': {
                  marginRight: '8px',
                  marginBottom: 0
                }
              }}
            />
          </Tabs>
        </Box>

        {isLoading ? (
          <CustomLoader message="Loading..." />
        ) : (
          <CommonTable data={tableData} columns={tableColumns} enableSorting={true} isPagination={false} />
        )}
      </Card>
    </Box>
  )
}

export default BranchManagementSection
